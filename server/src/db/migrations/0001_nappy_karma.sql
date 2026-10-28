ALTER TABLE "users" ADD COLUMN "about" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number");