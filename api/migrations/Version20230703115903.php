<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230703115903 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mandate (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, mandated_user_id INT DEFAULT NULL, content JSON DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', accepted_at DATETIME DEFAULT NULL, rejected_at DATETIME DEFAULT NULL, INDEX IDX_197D0FEEA76ED395 (user_id), INDEX IDX_197D0FEED33083EA (mandated_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE mandate ADD CONSTRAINT FK_197D0FEEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE mandate ADD CONSTRAINT FK_197D0FEED33083EA FOREIGN KEY (mandated_user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE mission ADD mandate_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23C6C1129CD FOREIGN KEY (mandate_id) REFERENCES mandate (id)');
        $this->addSql('CREATE INDEX IDX_9067F23C6C1129CD ON mission (mandate_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23C6C1129CD');
        $this->addSql('ALTER TABLE mandate DROP FOREIGN KEY FK_197D0FEEA76ED395');
        $this->addSql('ALTER TABLE mandate DROP FOREIGN KEY FK_197D0FEED33083EA');
        $this->addSql('DROP TABLE mandate');
        $this->addSql('DROP INDEX IDX_9067F23C6C1129CD ON mission');
        $this->addSql('ALTER TABLE mission DROP mandate_id');
    }
}
