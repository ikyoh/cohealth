<?php
// api/src/Doctrine/CurrentUserExtension.php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\MediaObject;
use App\Entity\UserOwnedInterface;
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

        $rootAlias = $queryBuilder->getRootAliases()[0];

    //  if ($reflexionClass->implementsInterface(UserOwnedInterface::class)) {
    //         $queryBuilder->andWhere("$rootAlias.user = :user");
    //         $queryBuilder->setParameter("user", $user);
    //     }
        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Mission::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR $rootAlias.coworkers LIKE :userId");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
        } elseif ($reflexionClass->implementsInterface(UserOwnedInterface::class)) {
            $queryBuilder->andWhere("$rootAlias.user = :user");
            $queryBuilder->setParameter("user", $user);
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
