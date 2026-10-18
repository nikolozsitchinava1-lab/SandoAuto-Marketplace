import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const sellerRequestsTable = pgTable("seller_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  vehicleMakeModel: text("vehicle_make_model").notNull(),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SellerRequest = typeof sellerRequestsTable.$inferSelect;
