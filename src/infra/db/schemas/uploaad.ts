import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const uploadSchema = pgTable('uploads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  remoteKey: text('remote_key').notNull().unique(),
  remoteUrl: text('remote_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  size: text('size').notNull(),
  
})
