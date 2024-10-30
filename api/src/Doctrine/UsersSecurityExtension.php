<?php
// api/src/Doctrine/UsersRolesExtension.php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\User;


final class UsersSecurityExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {


        $user = $this->security->getUser();
        $userRoles = $user->getRoles();

        $rootAlias = $queryBuilder->getRootAliases()[0];

        if ($resourceClass === User::class) {

            $excludedDomain = '@cohealth.ch';

            $queryBuilder->andWhere(
                $queryBuilder->expr()->notLike("$rootAlias.email", $queryBuilder->expr()->literal('%' . $excludedDomain))
            );

            if (!in_array('ROLE_ADMIN', $userRoles)) {
                $queryBuilder->andWhere("$rootAlias.isActive = :isActive")
                    ->setParameter('isActive', true);
            }
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
