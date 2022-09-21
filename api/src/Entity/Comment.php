<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\UserOwnedInterface;
use Symfony\Component\Serializer\Annotation\Groups;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: CommentRepository::class)]

#[ApiResource(
    normalizationContext: ['groups' => ['comments:read']],
    denormalizationContext: ['groups' => ['comment:write']],
    itemOperations: [
        'get' => [
            'normalization_context' => ['groups' => ['comment:read']],
        ],
        'put' => []
    ],
)]
#[ApiFilter(ExistsFilter::class, properties: ['doctor','assurance'])]
#[ApiFilter(SearchFilter::class, properties: ['doctor' => 'exact', 'assurance' => 'exact'])]
class Comment implements UserOwnedInterface
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;


    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["comments:read", "comment:read", "comment:write"])]
    private $content;


    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["comments:read", "comment:read"])]
    private $user;


    #[ORM\Column(type: 'datetime')]
    #[Groups(["comments:read", "comment:read"])]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: Doctor::class, inversedBy: 'comment')]
    #[Groups(["comments:read", "comment:read", "comment:write"])]
    private $doctor = null;

    #[ORM\ManyToOne(targetEntity: Assurance::class, inversedBy: 'comment')]
    #[Groups(["comments:read", "comment:read", "comment:write"])]
    private $assurance = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDoctor(): ?Doctor
    {
        return $this->doctor;
    }

    public function setDoctor(?Doctor $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }

    public function getAssurance(): ?Assurance
    {
        return $this->assurance;
    }

    public function setAssurance(?Assurance $assurance): self
    {
        $this->assurance = $assurance;

        return $this;
    }
}
