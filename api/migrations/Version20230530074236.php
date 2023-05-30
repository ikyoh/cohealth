<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230530074236 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE doctor (id INT AUTO_INCREMENT NOT NULL, is_active TINYINT(1) NOT NULL, category VARCHAR(255) NOT NULL, fullname VARCHAR(255) NOT NULL, organization VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, fax VARCHAR(255) DEFAULT NULL, mobile VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, npa VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, canton VARCHAR(255) DEFAULT NULL, address1 VARCHAR(255) DEFAULT NULL, address2 VARCHAR(255) DEFAULT NULL, rcc VARCHAR(255) DEFAULT NULL, gln VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C87F4FB17');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C87F4FB17');
        $this->addSql('ALTER TABLE patient DROP FOREIGN KEY FK_1ADAD7EB87F4FB17');
        $this->addSql('DROP TABLE doctor');
    }
}
