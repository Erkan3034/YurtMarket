"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser, fetchDorms } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth-store";

const schema = z.object({
  name: z.string().min(3, "İsim en az 3 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
  dormId: z.string().min(1, "Yurt seçimi gerekli"),
  roomNumber: z.string().min(1, "Oda numarası gerekli"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const dormsQuery = useQuery({
    queryKey: ["dorms"],
    queryFn: fetchDorms,
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      setSession({ user, session: { accessToken: "", refreshToken: "" } });
      onSuccess?.();
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({ ...values });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Ad Soyad" placeholder="Adınız" {...register("name")} error={errors.name?.message} />
      <Input label="E-posta" type="email" placeholder="ornek@yurt.com" {...register("email")} error={errors.email?.message} />
      <Input label="Şifre" type="password" placeholder="••••••" {...register("password")} error={errors.password?.message} />
      <Select
        label="Yurt"
        {...register("dormId")}
        options={[
          { value: "", label: dormsQuery.isLoading ? "Yurtlar yükleniyor..." : "Seçiniz" },
          ...(dormsQuery.data?.map((dorm) => ({ value: dorm.id, label: dorm.name })) ?? []),
        ]}
        disabled={dormsQuery.isLoading}
        error={errors.dormId?.message}
      />
      <Input label="Oda Numarası" placeholder="101" {...register("roomNumber")} error={errors.roomNumber?.message} />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <span className="flex items-center gap-2">
            <Spinner /> Kayıt yapılıyor
          </span>
        ) : (
          "Kayıt Ol"
        )}
      </Button>
      {mutation.error ? <p className="text-sm text-rose-500">{mutation.error.message}</p> : null}
    </form>
  );
};

