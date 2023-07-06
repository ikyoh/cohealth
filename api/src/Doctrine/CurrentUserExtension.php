<?php
// api/src/Doctrine/CurrentUserExtension.php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Mandate;
use App\Entity\UserOwnedInterface;
use App\Entity\MediaObject;
use App\Entity\Mission;
use App\Entity\Prescription;


final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {

        $reflexionClass = new \ReflectionClass($resourceClass);

        $user = $this->security->getUser();
        $userRoles = $user->getRoles();


        $rootAlias = $queryBuilder->getRootAliases()[0];

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Mandate::class) {
            if (in_array("ROLE_COORDINATOR", $userRoles))
                return;
            $queryBuilder->andWhere("$rootAlias.user = :user OR $rootAlias.mandateUser = :user");
            $queryBuilder->setParameter("user", $user);
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Mission::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR $rootAlias.coworkers LIKE :userId");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Prescription::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR mission.coworkers LIKE :userId");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            $queryBuilder->leftJoin("$rootAlias.mission", 'mission');
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === MediaObject::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR mission.coworkers LIKE :userId");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            $queryBuilder->leftJoin("$rootAlias.mission", 'mission');
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class)) {
            $queryBuilder->andWhere("$rootAlias.user = :user");
            $queryBuilder->setParameter("user", $user);
            return;
        }
    }

    //public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null): void;
    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
