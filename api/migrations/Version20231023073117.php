<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231023073117 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE media_object ADD mandate_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D431326C1129CD FOREIGN KEY (mandate_id) REFERENCES mandate (id)');
        $this->addSql('CREATE INDEX IDX_14D431326C1129CD ON media_object (mandate_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE media_object DROP FOREIGN KEY FK_14D431326C1129CD');
        $this->addSql('DROP INDEX IDX_14D431326C1129CD ON media_object');
        $this->addSql('ALTER TABLE media_object DROP mandate_id');
    }
}
