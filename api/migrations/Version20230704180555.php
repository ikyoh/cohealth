<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230704180555 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mandate ADD user_id INT NOT NULL, ADD mandate_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE mandate ADD CONSTRAINT FK_197D0FEEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE mandate ADD CONSTRAINT FK_197D0FEE69789EBE FOREIGN KEY (mandate_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_197D0FEEA76ED395 ON mandate (user_id)');
        $this->addSql('CREATE INDEX IDX_197D0FEE69789EBE ON mandate (mandate_user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mandate DROP FOREIGN KEY FK_197D0FEEA76ED395');
        $this->addSql('ALTER TABLE mandate DROP FOREIGN KEY FK_197D0FEE69789EBE');
        $this->addSql('DROP INDEX IDX_197D0FEEA76ED395 ON mandate');
        $this->addSql('DROP INDEX IDX_197D0FEE69789EBE ON mandate');
        $this->addSql('ALTER TABLE mandate DROP user_id, DROP mandate_user_id');
    }
}
