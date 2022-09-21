<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


use App\Entity\User;
use App\Entity\Service;
use App\Entity\Assurance;
use App\Entity\Doctor;

class AppFixtures extends Fixture
{

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {

        $user = new User();
        $user->setPassword($this->hasher->hashPassword($user, 'password'))
            ->setRoles(['ROLE_ADMIN'])
            ->setFirstname('Administrateur')
            ->setLastName('CoHealth')
            ->setIsActive(true)
            ->setIsOptin(true)
            ->setEmail("admin@user.com")
            ->setMobile("0000000000")
            ->setCreatedAt(new \DateTime())
            ->setSecureKey("123456");
        $manager->persist($user);
        $manager->flush();

        $services_file = fopen('./public/csv/services.csv', 'r');
        if ($services_file !== FALSE) {
            while (($data = fgetcsv($services_file, 0, ',')) !== FALSE) {
                $service = new Service();
                $service->setTitle($data[1])
                    ->setFamily($data[2])
                    ->setAct($data[3])
                    ->setCategory($data[4])
                    ->setTime($data[5])
                    ->setIsActive($data[6])
                    ->setDescription($data[7])
                    ->setOpas($data[8]);
                $manager->persist($service);
            }
            fclose($services_file);
            $manager->flush();
        }

        $assurances_file = fopen('./public/csv/assurances.csv', 'r');
        if ($assurances_file !== FALSE) {
            while (($data = fgetcsv($assurances_file, 0, ',')) !== FALSE) {
                $assurance = new Assurance();
                $assurance->setIsActive($data[1])
                    ->setCompany($data[2])
                    ->setOrganization($data[3])
                    ->setType($data[4])
                    ->setAddress1($data[5])
                    ->setAddress2($data[6])
                    ->setNpa($data[7])
                    ->setCity($data[8])
                    ->setPhone($data[9])
                    ->setEmail($data[10])
                    ->setWww($data[11])
                    ->setGln($data[12]);
                $manager->persist($assurance);
            }
            fclose($assurances_file);
            $manager->flush();
        }

        $medecins_file = fopen('./public/csv/medecins.csv', 'r');
        if ($medecins_file !== FALSE) {
            while (($data = fgetcsv($medecins_file, 0, ',')) !== FALSE) {
                $doctor = new Doctor();
                $doctor->setIsActive($data[1])
                    ->setCategory($data[2])
                    ->setFullname($data[3])
                    ->setOrganization($data[4])
                    ->setPhone($data[5])
                    ->setFax($data[6])
                    ->setMobile($data[7])
                    ->setEmail($data[8])
                    ->setNpa($data[9])
                    ->setCity($data[10])
                    ->setCanton($data[11])
                    ->setAddress1($data[12])
                    ->setAddress2($data[13])
                    ->setGln($data[14])
                    ->setRcc($data[15]);
                $manager->persist($doctor);
            }
            fclose($medecins_file);
            $manager->flush();
        }

    }
}
