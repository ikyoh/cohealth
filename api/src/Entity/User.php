<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\Controller\CurrentUserController;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Action\NotFoundAction;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use ApiPlatform\Core\Annotation\ApiProperty;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    iri: 'http://schema.org/MediaObject',
    normalizationContext: ['groups' => ["users:read"]],
    denormalizationContext : ['groups' => ["user:write"]],
    collectionOperations: [ 
        'post' => [],
        'currentUser' => [
            'pagination_enabled' => false,
            'path' => '/current_user',
            'method' => 'get',
            'controller' => CurrentUserController::class,
            'read' => false
        ],
        'users' => [
            'pagination_enabled' => true,
            'method' => 'get',
            'read' => true
        ],

    ],
    itemOperations: [
        'get' => [
            'controller' => NotFoundAction::class,
            'openapi_context' => ['summary' => 'Hidden'],
            'read' => false,
            'output' => false
        ],
        'put' => [
        ],
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['rcc' => 'exact'])]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["users:read", "user:write", "partners:read", "mission:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["users:read", "user:write","partners:read", "mission:read"])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["users:read", "user:write"])]
    private $roles = []; // ROLE_ADMIN / ROLE_ORGANIZATION / ROLE_NURSE / ROLE_EMPLOYEE

    #[ORM\Column(type: 'string')]
    #[Groups(["users:read", "user:write"])]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["users:read", "user:write", "missions:read", "mission:read", "partners:read"])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["users:read", "user:write", "missions:read", "mission:read", "partners:read"])]
    private $lastname;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["users:read", "user:write"])]
    private $isActive = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $organization;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write", "partners:read", "mission:read"])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $fax;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(["users:read", "user:write", "partners:read", "mission:read"])]
    private $mobile;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["users:read", "user:write"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $secureKey = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["users:read", "user:write"])]
    private $isOptin = false;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write", "missions:read", "mission:read", "partners:read"])]
    private $rcc = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $gln = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $iban;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Partner::class)]
    #[Groups(["users:read", "user:write"])]
    private $partners;

    #[ORM\OneToOne(targetEntity: MediaObject::class, cascade: ['persist', 'remove'])]
    #[Groups(["users:read", "user:write", "media_object:write"])]
    private $avatar;

    #[ORM\OneToOne(targetEntity: MediaObject::class, cascade: ['persist', 'remove'])]
    #[Groups(["users:read", "user:write", "media_object:write", "mission:read"])]
    private $signature;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $address1;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $address2;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $bic;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $city;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["users:read", "user:write"])]
    private $npa;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: MediaObject::class)]
    private $mediaObjects;

    #[ORM\Column(type: 'boolean')]
    private $isApproved = false;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->partners = new ArrayCollection();
        $this->mediaObjects = new ArrayCollection();
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

}
