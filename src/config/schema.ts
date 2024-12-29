import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  imageUrl: varchar('image_url').notNull(),
  credits: integer('credits').default(3),
});


export const AIGeneratedImage = pgTable('ai_generated_images', {
  id: serial('id').primaryKey(),
  roomType: varchar('room_type').notNull(),
  designType: varchar('design_type').notNull(),
  additionalRequirements: varchar('additional_requirements'),
  originalImageUrl: varchar('original_image_url').notNull(),
  aiImageUrl: varchar('ai_image_url').notNull(),
  userEmail: varchar('user_email').notNull(),
  // userId: integer('user_id').notNull(),
})