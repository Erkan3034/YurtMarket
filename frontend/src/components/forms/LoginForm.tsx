"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth-store";

const schema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSuccess?: () => void;
}

export const LoginForm = ({ onSuccess }: Props) => {
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setSession({ user: data.user, session: data.session });
      onSuccess?.();
    },
  });

  const onSubmit = (values: FormValues) => mutation.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="E-posta" type="email" {...register("email")} error={errors.email?.message} />
      <Input label="Şifre" type="password" {...register("password")} error={errors.password?.message} />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <span className="flex items-center gap-2">
            <Spinner /> Giriş yapılıyor
          </span>
        ) : (
          "Giriş Yap"
        )}
      </Button>
      {mutation.error ? <p className="text-sm text-rose-500">{mutation.error.message}</p> : null}
    </form>
  );
};

