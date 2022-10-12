<?php

namespace App\Entity;

use App\Repository\PartnerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\UserOwnedInterface;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;


#[ORM\Entity(repositoryClass: PartnerRepository::class)]
#[ApiResource(
    paginationClientEnabled: true,
    normalizationContext: ['groups' => ['partners:read']],
    denormalizationContext: ['groups' => ['partner:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['partner:read']]),
        new Put(),
        new Post()
    ]
)]

class Partner implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["partners:read", "partner:read"])]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'partners')]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["partners:read", "partner:read", "partner:write"])]
    private $partner;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPartner(): ?User
    {
        return $this->partner;
    }

    public function setPartner(?User $partner): self
    {
        $this->partner = $partner;

        return $this;
    }
}
