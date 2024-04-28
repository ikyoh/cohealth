<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ObservationRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;


#[ORM\Entity(repositoryClass: ObservationRepository::class)]
#[ApiResource(
    paginationClientEnabled: false,
    normalizationContext: ['groups' => ['observations:read']],
    denormalizationContext: ['groups' => ['observation:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['observation:read']]),
        new Put(),
        new Post(),
        new Delete(),
    ]
)]
#[ApiFilter(OrderFilter::class, properties: ['createdAt'])]
class Observation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["observations:read", "observation:read"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["observations:read", "observation:read", "observation:write", "mission:read"])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["observations:read", "observation:read", "observation:write", "mission:read"])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'observations')]
    #[Groups(["observations:read", "observation:read", "observation:write"])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Mission $mission = null;


    //can be observation, tension, poids, température
    #[ORM\Column(length: 255)]
    #[Groups(["observations:read", "observation:read", "observation:write", "mission:read"])]
    private ?string $category = null;

    #[ORM\ManyToOne]
    #[Groups(["observations:read", "observation:read", "observation:write", "mission:read"])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): self
    {
        $this->mission = $mission;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
