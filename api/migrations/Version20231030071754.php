<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231030071754 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission ADD opas_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23CAF68A31E FOREIGN KEY (opas_id) REFERENCES prescription (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9067F23CAF68A31E ON mission (opas_id)');
        $this->addSql('ALTER TABLE prescription DROP FOREIGN KEY FK_1FBFB8D9BE6CAE90');
        $this->addSql('DROP INDEX IDX_1FBFB8D9BE6CAE90 ON prescription');
        $this->addSql('ALTER TABLE prescription DROP mission_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23CAF68A31E');
        $this->addSql('DROP INDEX UNIQ_9067F23CAF68A31E ON mission');
        $this->addSql('ALTER TABLE mission DROP opas_id');
        $this->addSql('ALTER TABLE prescription ADD mission_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE prescription ADD CONSTRAINT FK_1FBFB8D9BE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_1FBFB8D9BE6CAE90 ON prescription (mission_id)');
    }
}
