-- Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Adicionar triggers para atualizar updatedAt
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_updated_at BEFORE UPDATE ON "Category"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON "Order"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Criar usuário admin (senha: admin123 - você deve mudar depois)
INSERT INTO "User" ("id", "email", "password", "name", "role")
VALUES (
    'admin-user-id',
    'admin@gus-bert.com',
    '$2b$10$yPG1j7MIZuFbNBEbEqdi/ubWybnYeKiFoPk4oZ0EmDbwMb0zOdm3C',
    'Admin',
    'admin'
);

-- Criar categorias iniciais
INSERT INTO "Category" ("id", "name", "slug", "active") VALUES
    ('cat-tenis', 'Tênis', 'tenis', true),
    ('cat-camisetas', 'Camisetas', 'camisetas', true),
    ('cat-moletons', 'Moletons', 'moletons', true),
    ('cat-calcas', 'Calças', 'calcas', true),
    ('cat-acessorios', 'Acessórios', 'acessorios', true),
    ('cat-calcados', 'Calçados', 'calcados', true),
    ('cat-jaquetas', 'Jaquetas', 'jaquetas', true),
    ('cat-bone', 'Bonés', 'bone', true);
