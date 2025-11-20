import fastify from "fastify";

import { SupabaseAuthAdapter } from "./infrastructure/auth/SupabaseAuthAdapter";
import { PrismaUserRepository } from "./infrastructure/repositories/PrismaUserRepository";
import { PrismaSellerRepository } from "./infrastructure/repositories/PrismaSellerRepository";
import { PrismaProductRepository } from "./infrastructure/repositories/PrismaProductRepository";
import { PrismaOrderRepository } from "./infrastructure/repositories/PrismaOrderRepository";
import { PrismaReviewRepository } from "./infrastructure/repositories/PrismaReviewRepository";
import { PrismaSubscriptionRepository } from "./infrastructure/repositories/PrismaSubscriptionRepository";
import { PrismaDormRepository } from "./infrastructure/repositories/PrismaDormRepository";

import { RegisterUser } from "./application/useCases/user/RegisterUser";
import { LoginUser } from "./application/useCases/user/LoginUser";
import { ApplySeller } from "./application/useCases/seller/ApplySeller";
import { ApproveSeller } from "./application/useCases/seller/ApproveSeller";
import { GetSellerStats } from "./application/useCases/seller/GetSellerStats";
import { AddProduct } from "./application/useCases/product/AddProduct";
import { UpdateProduct } from "./application/useCases/product/UpdateProduct";
import { DeleteProduct } from "./application/useCases/product/DeleteProduct";
import { ListProducts } from "./application/useCases/product/ListProducts";
import { CreateOrder } from "./application/useCases/order/CreateOrder";
import { CancelOrder } from "./application/useCases/order/CancelOrder";
import { UpdateOrderStatus } from "./application/useCases/order/UpdateOrderStatus";
import { AddReview } from "./application/useCases/review/AddReview";
import { CreateSubscription } from "./application/useCases/subscription/CreateSubscription";
import { ListDormSellers } from "./application/useCases/dorm/ListDormSellers";

import { UserController } from "./interface/http/controllers/UserController";
import { SellerController } from "./interface/http/controllers/SellerController";
import { ProductController } from "./interface/http/controllers/ProductController";
import { OrderController } from "./interface/http/controllers/OrderController";
import { ReviewController } from "./interface/http/controllers/ReviewController";
import { SubscriptionController } from "./interface/http/controllers/SubscriptionController";
import { DormController } from "./interface/http/controllers/DormController";

import { userRoutes } from "./interface/http/routes/userRoutes";
import { sellerRoutes } from "./interface/http/routes/sellerRoutes";
import { productRoutes } from "./interface/http/routes/productRoutes";
import { orderRoutes } from "./interface/http/routes/orderRoutes";
import { reviewRoutes } from "./interface/http/routes/reviewRoutes";
import { subscriptionRoutes } from "./interface/http/routes/subscriptionRoutes";
import { dormRoutes } from "./interface/http/routes/dormRoutes";

async function bootstrap() {
  const app = fastify({ logger: true });

  const userRepo = new PrismaUserRepository();
  const sellerRepo = new PrismaSellerRepository();
  const productRepo = new PrismaProductRepository();
  const orderRepo = new PrismaOrderRepository();
  const reviewRepo = new PrismaReviewRepository();
  const subscriptionRepo = new PrismaSubscriptionRepository();
  const dormRepo = new PrismaDormRepository();

  const authProvider = new SupabaseAuthAdapter();

  const registerUser = new RegisterUser(userRepo, authProvider);
  const loginUser = new LoginUser(userRepo, authProvider);
  const applySeller = new ApplySeller(sellerRepo, userRepo);
  const approveSeller = new ApproveSeller(sellerRepo);
  const getSellerStats = new GetSellerStats(sellerRepo);
  const addProduct = new AddProduct(productRepo, sellerRepo);
  const updateProduct = new UpdateProduct(productRepo);
  const deleteProduct = new DeleteProduct(productRepo);
  const listProducts = new ListProducts(productRepo);
  const createOrder = new CreateOrder(orderRepo, productRepo);
  const cancelOrder = new CancelOrder(orderRepo);
  const updateOrderStatus = new UpdateOrderStatus(orderRepo);
  const addReview = new AddReview(reviewRepo, orderRepo);
  const createSubscription = new CreateSubscription(subscriptionRepo, sellerRepo);
  const listDormSellers = new ListDormSellers(dormRepo);

  const userController = new UserController(registerUser, loginUser);
  const sellerController = new SellerController(applySeller, approveSeller, getSellerStats, sellerRepo);
  const productController = new ProductController(
    addProduct,
    updateProduct,
    deleteProduct,
    listProducts,
    productRepo,
  );
  const orderController = new OrderController(createOrder, cancelOrder, updateOrderStatus, orderRepo);
  const reviewController = new ReviewController(addReview, reviewRepo);
  const subscriptionController = new SubscriptionController(createSubscription, subscriptionRepo);
  const dormController = new DormController(listDormSellers, dormRepo);

  await userRoutes(app, userController);
  await sellerRoutes(app, sellerController);
  await productRoutes(app, productController);
  await orderRoutes(app, orderController);
  await reviewRoutes(app, reviewController);
  await subscriptionRoutes(app, subscriptionController);
  await dormRoutes(app, dormController);

  const port = Number(process.env.PORT ?? 3333);
  const host = process.env.HOST ?? "0.0.0.0";

  try {
    await app.listen({ port, host });
    app.log.info(`HTTP server running on http://${host}:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

bootstrap();

