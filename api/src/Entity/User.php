<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\Controller\CurrentUserController;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use App\Filter\MultipleFieldsSearchFilter;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\EntityListeners(['App\EntityListener\UserListener'])]
#[ApiResource(
    types: ['https://schema.org/MediaObject'],
    normalizationContext: ['groups' => ["users:read"]],
    denormalizationContext: ['groups' => ["user:write"]],
    operations: [
        new Post(),
        new Get(normalizationContext: ['groups' => ['user:read']]),
        new Put(),
        new GetCollection(security: "is_granted('ROLE_USER')"),
        // new GetCollection(
        //     name: 'users',
        //     uriTemplate: '/users',
        //     paginationEnabled: true,
        //     controller: AppUsersController::class,
        //     //read: false,
        //     security: "is_granted('ROLE_USER')"
        // ),
        new Get(
            name: 'currentUser',
            uriTemplate: '/current_user',
            paginationEnabled: false,
            controller: CurrentUserController::class,
            read: false,
            security: "is_granted('ROLE_USER')"
        ),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['rcc' => 'exact', 'roles' => 'partial'])]

#[ApiFilter(OrderFilter::class, properties: ['id', 'lastname', 'email', 'rcc', 'isActive'])]
#[ApiFilter(MultipleFieldsSearchFilter::class, properties: [
    "id",
    "firstname",
    "lastname",
    "email",
    "organization",
    "rcc",
    "roles",
])]


class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["users:read", "user:read", "user:write", "partners:read", "missions:read", "mission:read", "mandate:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 180)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read", "mandate:read"])]
    #[Assert\Email(
        message: "L'email {{ value }} n'est pas un email valide.",
    )]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $roles = []; // ROLE_ADMIN / ROLE_COORDINATOR / ROLE_NURSE / ROLE_DOCTOR / ROLE_EMPLOYEE / ROLE_ORGANIZATION_MANDATOR / ROLE_ORGANIZATION_BENEFIT

    #[ORM\Column(type: 'string')]
    #[Groups(["user:write"])]
    private $password;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "missions:read", "mission:read", "partners:read", "mandates:read", "mandate:read", "mandates_group:read"])]
    private $firstname = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "missions:read", "mission:read", "partners:read", "mandates:read", "mandate:read", "mandates_group:read"])]
    private $lastname = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $isActive = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "mandate:read"])]
    private $organization = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read", "mandate:read"])]
    private $phone = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $fax = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read", "mandate:read"])]
    private $mobile = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $secureKey = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $isOptin = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "missions:read", "partners:read", "mandate:read", "mandate_group:read"])]
    private $rcc = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $gln = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $iban = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Partner::class)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $partners;

    #[ORM\OneToOne(targetEntity: MediaObject::class)]
    #[Groups(["users:read", "user:read", "user:write", "mission:read"])]
    private $avatar;

    #[ORM\OneToOne(targetEntity: MediaObject::class)]
    #[Groups(["users:read", "user:read", "user:write", "mandate:read"])]
    private $signature;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read"])]
    private $address1 = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $address2 = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $bic = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read"])]
    private $city = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:read", "user:write", "partners:read"])]
    private $npa = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: MediaObject::class)]
    private $mediaObjects;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["users:read", "user:read", "user:write"])]
    private $isApproved = false;

    #[ORM\OneToMany(mappedBy: 'mandateUser', targetEntity: Mandate::class)]
    private Collection $mandates;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: MandateGroup::class, orphanRemoval: true)]
    private Collection $mandateGroups;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->partners = new ArrayCollection();
        $this->mediaObjects = new ArrayCollection();
        $this->mandates = new ArrayCollection();
        $this->mandateGroups = new ArrayCollection();
    }

    // Issue for Can't get a way to read the property "username" in class "App\Entity\User" from authentication
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getOrganization(): ?string
    {
        return $this->organization;
    }

    public function setOrganization(?string $organization): self
    {
        $this->organization = $organization;

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

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

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

    public function getSecureKey(): ?string
    {
        return $this->secureKey;
    }

    public function setSecureKey(string $secureKey): self
    {
        $this->secureKey = $secureKey;

        return $this;
    }

    public function getIsOptin(): ?bool
    {
        return $this->isOptin;
    }

    public function setIsOptin(bool $isOptin): self
    {
        $this->isOptin = $isOptin;

        return $this;
    }

    public function getRcc(): ?string
    {
        return $this->rcc;
    }

    public function setRcc(?string $rcc): self
    {
        $this->rcc = $rcc;

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

    public function getIban(): ?string
    {
        return $this->iban;
    }

    public function setIban(?string $iban): self
    {
        $this->iban = $iban;

        return $this;
    }


    /**
     * @return Collection<int, Partner>
     */
    public function getPartners(): Collection
    {
        return $this->partners;
    }

    public function addPartner(Partner $partner): self
    {
        if (!$this->partners->contains($partner)) {
            $this->partners[] = $partner;
            $partner->setUser($this);
        }

        return $this;
    }

    public function removePartner(Partner $partner): self
    {
        if ($this->partners->removeElement($partner)) {
            // set the owning side to null (unless already changed)
            if ($partner->getUser() === $this) {
                $partner->setUser(null);
            }
        }

        return $this;
    }

    public function getAvatar(): ?MediaObject
    {
        return $this->avatar;
    }

    public function setAvatar(?MediaObject $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getSignature(): ?MediaObject
    {
        return $this->signature;
    }

    public function setSignature(?MediaObject $signature): self
    {
        $this->signature = $signature;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1(string $address1): self
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

    public function getBic(): ?string
    {
        return $this->bic;
    }

    public function setBic(?string $bic): self
    {
        $this->bic = $bic;

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

    public function getNpa(): ?string
    {
        return $this->npa;
    }

    public function setNpa(?string $npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    /**
     * @return Collection<int, MediaObject>
     */
    public function getMediaObjects(): Collection
    {
        return $this->mediaObjects;
    }

    public function addMediaObject(MediaObject $mediaObject): self
    {
        if (!$this->mediaObjects->contains($mediaObject)) {
            $this->mediaObjects[] = $mediaObject;
            $mediaObject->setUser($this);
        }

        return $this;
    }

    public function removeMediaObject(MediaObject $mediaObject): self
    {
        if ($this->mediaObjects->removeElement($mediaObject)) {
            // set the owning side to null (unless already changed)
            if ($mediaObject->getUser() === $this) {
                $mediaObject->setUser(null);
            }
        }

        return $this;
    }

    public function getIsApproved(): ?bool
    {
        return $this->isApproved;
    }

    public function setIsApproved(bool $isApproved): self
    {
        $this->isApproved = $isApproved;

        return $this;
    }

    /**
     * @return Collection<int, Mandate>
     */
    public function getMandates(): Collection
    {
        return $this->mandates;
    }

    public function addMandate(Mandate $mandate): self
    {
        if (!$this->mandates->contains($mandate)) {
            $this->mandates->add($mandate);
            $mandate->setMandateUser($this);
        }

        return $this;
    }

    public function removeMandate(Mandate $mandate): self
    {
        if ($this->mandates->removeElement($mandate)) {
            // set the owning side to null (unless already changed)
            if ($mandate->getMandateUser() === $this) {
                $mandate->setMandateUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, MandateGroup>
     */
    public function getMandateGroups(): Collection
    {
        return $this->mandateGroups;
    }

    public function addMandateGroup(MandateGroup $mandateGroup): self
    {
        if (!$this->mandateGroups->contains($mandateGroup)) {
            $this->mandateGroups->add($mandateGroup);
            $mandateGroup->setUser($this);
        }

        return $this;
    }

    public function removeMandateGroup(MandateGroup $mandateGroup): self
    {
        if ($this->mandateGroups->removeElement($mandateGroup)) {
            // set the owning side to null (unless already changed)
            if ($mandateGroup->getUser() === $this) {
                $mandateGroup->setUser(null);
            }
        }

        return $this;
    }
}
