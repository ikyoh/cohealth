<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240122095239 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE mandate_group (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, patient JSON NOT NULL, INDEX IDX_C344A5C4A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE mandate_group ADD CONSTRAINT FK_C344A5C4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE mandate ADD mandate_group_id INT NOT NULL, DROP grouping_id');
        $this->addSql('ALTER TABLE mandate ADD CONSTRAINT FK_197D0FEE5226364A FOREIGN KEY (mandate_group_id) REFERENCES mandate_group (id)');
        $this->addSql('CREATE INDEX IDX_197D0FEE5226364A ON mandate (mandate_group_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mandate DROP FOREIGN KEY FK_197D0FEE5226364A');
        $this->addSql('ALTER TABLE mandate_group DROP FOREIGN KEY FK_C344A5C4A76ED395');
        $this->addSql('DROP TABLE mandate_group');
        $this->addSql('DROP INDEX IDX_197D0FEE5226364A ON mandate');
        $this->addSql('ALTER TABLE mandate ADD grouping_id VARCHAR(255) NOT NULL, DROP mandate_group_id');
    }
}
