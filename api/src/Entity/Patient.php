<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\UserOwnedInterface;
use App\Repository\PatientRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['patients:read']],
    denormalizationContext: ['groups' => ['patient:write']],
    itemOperations: [
        'get' => [
            'normalization_context' => ['groups' => ['patient:read']],
        ],
        'put' => []
    ]
)]
class Patient implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["patients:read", "patient:read", "mission:read", "missions:read"])]
    private $id;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["patients:read", "patient:write", "mission:write"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(["patients:read", "patient:write", "mission:write"])]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write"])]
    private $status;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write", "missions:read", "mission:read"])]
    private $gender;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write", "missions:read", "mission:read"])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write", "missions:read", "mission:read"])]
    private $lastname;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write", "mission:read"])]
    private $birthdate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:read", "patient:write", "mission:write", "mission:read"])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "mission:read"])]
    private $mobile;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "mission:read"])]
    private $canton;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "mission:read"])]
    private $npa;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["readpatient:", "patient:write", "mission:write", "mission:read", "patients:read", "patient:read"])]
    private $city;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patient:read", "patient:write", "mission:write", "mission:read", "patients:read"])]
    private $address1;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patient:read", "patient:write", "mission:write", "mission:read", "patients:read"])]
    private $address2;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "mission:read"])]
    private $email;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patient:read", "patient:write", "mission:write", "mission:read", "patients:read"])]
    private $avsNumber;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patient:read", "patient:write", "mission:write", "mission:read", "patients:read"])]
    private $assuranceNumber;

    #[ORM\ManyToOne(targetEntity: Doctor::class, inversedBy: 'patients', cascade: ['persist', 'remove'])]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "doctor:write"])]
    private $doctor;

    #[ORM\ManyToOne(targetEntity: Assurance::class, inversedBy: 'patients', cascade: ['persist', 'remove'])]
    #[Groups(["patients:read", "patient:write", "mission:write", "patient:read", "assurance:write"])]
    private $assurance;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: Contact::class, orphanRemoval: true)]
    #[Groups(["patient:write", "mission:write", "patient:read"])]
    private $contacts;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["patient:write", "mission:write", "patient:read","mission:read", "patients:read"])]
    private $furtherInfos;

    #[ORM\OneToMany(mappedBy: 'patient', targetEntity: Mission::class, orphanRemoval: true)]
    #[Groups(["patients:read", "patient:read"])]
    private $missions;

    public function __construct()
    {
        $this->contacts = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->missions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

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

    public function getMobile(): ?string
    {
        return $this->mobile;
    }

    public function setMobile(?string $mobile): self
    {
        $this->mobile = $mobile;

        return $this;
    }

    public function getCanton(): ?string
    {
        return $this->canton;
    }

    public function setCanton(?string $canton): self
    {
        $this->canton = $canton;

        return $this;
    }

    public function getNpa(): ?string
    {
        return $this->npa;
    }

    public function setNpa(?string $npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    public function getAvsNumber(): ?string
    {
        return $this->avsNumber;
    }

    public function setAvsNumber(?string $avsNumber): self
    {
        $this->avsNumber = $avsNumber;

        return $this;
    }

    public function getAssuranceNumber(): ?string
    {
        return $this->assuranceNumber;
    }

    public function setAssuranceNumber(?string $assuranceNumber): self
    {
        $this->assuranceNumber = $assuranceNumber;

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

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): self
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts[] = $contact;
            $contact->setPatient($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): self
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getPatient() === $this) {
                $contact->setPatient(null);
            }
        }

        return $this;
    }

    public function getFurtherInfos(): ?string
    {
        return $this->furtherInfos;
    }

    public function setFurtherInfos(?string $furtherInfos): self
    {
        $this->furtherInfos = $furtherInfos;

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
            $mission->setPatient($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getPatient() === $this) {
                $mission->setPatient(null);
            }
        }

        return $this;
    }
}
