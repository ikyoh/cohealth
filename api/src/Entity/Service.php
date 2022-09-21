<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ServiceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(attributes: ["pagination_client_enabled" => true])]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[ORM\Column(type: 'string', length: 255)]
    private $family;

    #[ORM\Column(type: 'integer')]
    private $act;

    #[ORM\Column(type: 'string', length: 255)]
    private $category;
    
    #[ORM\Column(type: 'integer')]
    private $time;
    
    #[ORM\Column(type: 'boolean')]
    private $isActive;
    
    #[ORM\Column(type: 'string', length: 1000, nullable: true)]
    private $description;
    
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $opas;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getFamily(): ?string
    {
        return $this->family;
    }

    public function setFamily(string $family): self
    {
        $this->family = $family;

        return $this;
    }

    public function getAct(): ?int
    {
        return $this->act;
    }

    public function setAct(int $act): self
    {
        $this->act = $act;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getTime(): ?int
    {
        return $this->time;
    }

    public function setTime(int $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getOpas(): ?string
    {
        return $this->opas;
    }

    public function setOpas(?string $opas): self
    {
        $this->opas = $opas;

        return $this;
    }


}
