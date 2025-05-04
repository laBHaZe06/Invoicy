<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250422063336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice_template DROP FOREIGN KEY FK_884845DB7E3C61F9');
        $this->addSql('DROP INDEX IDX_884845DB7E3C61F9 ON invoice_template');
        $this->addSql('ALTER TABLE invoice_template CHANGE owner_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE invoice_template ADD CONSTRAINT FK_884845DBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_884845DBA76ED395 ON invoice_template (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice_template DROP FOREIGN KEY FK_884845DBA76ED395');
        $this->addSql('DROP INDEX IDX_884845DBA76ED395 ON invoice_template');
        $this->addSql('ALTER TABLE invoice_template CHANGE user_id owner_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE invoice_template ADD CONSTRAINT FK_884845DB7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_884845DB7E3C61F9 ON invoice_template (owner_id)');
    }
}
