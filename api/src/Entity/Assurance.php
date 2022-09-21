<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\AssuranceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AssuranceRepository::class)]
#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext: ['groups' => ['assurances:read']],
    denormalizationContext: ['groups' => ['assurance:write']],
)]
class Assurance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["assurances:read", "patients:read", "missions:read"])]
    private $id;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write"]) ]
    private $isActive = true;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read", "missions:read", "patients:read", "patient:read"])]
    private $company;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write"]) ]
    private $organization;

    #[ORM\Column(type: 'string', length: 10)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "patient:read", "patients:read", "mission:read", "missions:read"])]
    private $type;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $address1;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $address2;

    #[ORM\Column(type: 'string', length: 10)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $npa;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $city;

    #[ORM\Column(type: 'string', length: 15, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "mission:read"])]
    private $email;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write"]) ]
    private $www;

    #[ORM\Column(type: 'string', length: 13, nullable: true)]
    #[Groups(["assurances:read", "assurance:write", "mission:write", "patient:write", "patient:read", "patients:read", "mission:read", "missions:read"])]
    private $gln;

    #[ORM\OneToMany(mappedBy: 'assurance', targetEntity: Patient::class)]
    private $patients;

    #[ORM\OneToMany(mappedBy: 'assurance', targetEntity: Mission::class)]
    private $missions;

    #[ORM\OneToMany(mappedBy: 'assurance', targetEntity: Comment::class)]
    private $comment;

    public function __construct()
    {
        $this->patients = new ArrayCollection();
        $this->missions = new ArrayCollection();
        $this->comment = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getOrganization(): ?string
    {
        return $this->organization;
    }

    public function setOrganization(string $organization): self
    {
        $this->organization = $organization;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1(?string $address1): self
    {
        $this->address1 = $address1;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2(?string $address2): self
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getNpa(): ?string
    {
        return $this->npa;
    }

    public function setNpa(string $npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getWww(): ?string
    {
        return $this->www;
    }

    public function setWww(?string $www): self
    {
        $this->www = $www;

        return $this;
    }

    public function getGln(): ?string
    {
        return $this->gln;
    }

    public function setGln(?string $gln): self
    {
        $this->gln = $gln;

        return $this;
    }

    /**
     * @return Collection<int, Patient>
     */
    public function getPatients(): Collection
    {
        return $this->patients;
    }

    public function addPatient(Patient $patient): self
    {
        if (!$this->patients->contains($patient)) {
            $this->patients[] = $patient;
            $patient->setAssurance($this);
        }

        return $this;
    }

    public function removePatient(Patient $patient): self
    {
        if ($this->patients->removeElement($patient)) {
            // set the owning side to null (unless already changed)
            if ($patient->getAssurance() === $this) {
                $patient->setAssurance(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Mission>
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Mission $mission): self
    {
        if (!$this->missions->contains($mission)) {
            $this->missions[] = $mission;
            $mission->setAssurance($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getAssurance() === $this) {
                $mission->setAssurance(null);
            }
        }

        return $this;
    }


    /**
     * @return Collection<int, Comment>
     */
    public function getComment(): Collection
    {
        return $this->comment;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comment->contains($comment)) {
            $this->comment[] = $comment;
            $comment->setAssurance($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comment->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getAssurance() === $this) {
                $comment->setAssurance(null);
            }
        }

        return $this;
    }

}
