<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Doctrine\ORM\EntityManagerInterface;


#[AsController]
class AppUsersController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke()
    {
        // Get the UserRepository
        $userRepository = $this->entityManager->getRepository(User::class);

        // Query for users excluding those with email containing "@cohealth.ch"
        $queryBuilder = $userRepository->createQueryBuilder('u')
            ->where('u.email NOT LIKE :emailFilter')
            ->setParameter('emailFilter', '%@cohealth.ch')
            ->getQuery();

        // Execute the query to get the filtered users
        $users = $queryBuilder->getResult();


        // You can serialize and return the $users as per your API response format
        return $users;
    }
}
