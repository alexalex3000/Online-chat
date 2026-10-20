CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"user_id" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"chat_sounds" boolean DEFAULT true NOT NULL,
	"pinned_message_alerts" boolean DEFAULT true NOT NULL,
	"show_online_status" boolean DEFAULT true NOT NULL,
	"do_not_distract" boolean DEFAULT false NOT NULL,
	CONSTRAINT "settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(30) NOT NULL,
	"surname" varchar(30) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"last_time_online" timestamp DEFAULT now() NOT NULL,
	"logo_url" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;