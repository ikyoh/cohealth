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
use App\Entity\MandateGroup;
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

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === MandateGroup::class) {
            if (in_array("ROLE_COORDINATOR", $userRoles))
                return;
            $queryBuilder->leftJoin("$rootAlias.mandates", 'mandates');
            $queryBuilder->andWhere("$rootAlias.user = :user OR mandates.mandateUser = :user");
            // $queryBuilder->orWhere('mandates.mandateUser = :user');
            $queryBuilder->setParameter("user", $user);

            // ->leftJoin('mg.mandates', 'm') // Jointure pour accéder aux Mandates de chaque MandateGroup
            // ->andWhere('mg.user = :user OR m.user = :user') // Conditions pour les deux types de relation avec l'utilisateur
            // ->setParameter('user', $user)


            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Mandate::class) {
            if (in_array("ROLE_COORDINATOR", $userRoles))
                return;
            $queryBuilder->andWhere("$rootAlias.user = :user OR $rootAlias.mandateUser = :user");
            $queryBuilder->setParameter("user", $user);
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Mission::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR $rootAlias.coworkers LIKE :userId OR mandate.user = :user");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            $queryBuilder->leftJoin("$rootAlias.mandate", 'mandate');
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === Prescription::class) {
            $queryBuilder->andWhere("$rootAlias.user = :user OR mission.coworkers LIKE :userId OR missionMandate.user = :user");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            $queryBuilder->leftJoin("$rootAlias.mission", 'mission');

            $queryBuilder->leftJoin("mission.mandate", 'missionMandate');
            //dd($queryBuilder);
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class) && $resourceClass === MediaObject::class) {
            if (in_array("ROLE_COORDINATOR", $userRoles))
                return;
            $queryBuilder->andWhere("$rootAlias.user = :user OR mandate.mandateUser = :user OR mission.coworkers LIKE :userId");
            $queryBuilder->setParameter("user", $user);
            $queryBuilder->setParameter('userId', '%' . $user->getId() . '%');
            $queryBuilder->leftJoin("$rootAlias.mission", 'mission');
            $queryBuilder->leftJoin("$rootAlias.mandate", 'mandate');
            return;
        }

        if ($reflexionClass->implementsInterface(UserOwnedInterface::class)) {
            $queryBuilder->andWhere("$rootAlias.user = :user");
            $queryBuilder->setParameter("user", $user);
            return;
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
