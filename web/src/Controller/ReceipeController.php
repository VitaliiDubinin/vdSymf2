<?php

namespace App\Controller;

use App\Entity\Recipe;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_main')]
class ReceipeController extends AbstractController
{
    #[Route('/recipes/all', name: "get_all_recipes", methods: ['GET'])]
    public function getAllRecipe(EntityManagerInterface $em)
    {
        $recipes = $em->getRepository(Recipe::class)->findAll();
        $response = [];
        foreach ($recipes as $recipe) {
            $response[] = array(
                'id' => $recipe->getId(),
                'name' => $recipe->getName(),
                'photo' => $recipe->getPhoto(),
                'instructions' => $recipe->getInstructions(),
                'difficulty' => $recipe->getDifficulty(),
                'ingredients' => $recipe->getIngredients(),
            );
        }
        return $this->json($response);
    }

    #[Route('/recipes/add', name: "add_new_recipe", methods: ['POST'])]
    public function addRecipe(Request $request, ManagerRegistry $doctrine)
    {
        $em = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $newRecipe = new Recipe();

        $newRecipe->setName($data["name"]);
        $newRecipe->setPhoto($request->request->get("photo"));
        $newRecipe->setInstructions($data["instructions"]);
        $newRecipe->setDifficulty($data["difficulty"]);
        $newRecipe->setIngredients($data["ingredients"]);

        $em->persist($newRecipe);
        $em->flush();

        return new Response('Added a new recipe ' . $newRecipe->getId());
    }

    #[Route('/recipes/find/{id}', name: "find_a_recipe", methods: ['GET'])]
    public function findRecipe(int $id, EntityManagerInterface $em)
    {
        $recipe = $em->getRepository(Recipe::class)->find($id);

        if (!$recipe) {
            return $this->json('No recipe was found with the id of ' . $id, 404);
        }

        $data = [
            'id' => $recipe->getId(),
            'name' => $recipe->getName(),
            'photo' => $recipe->getPhoto(),
            'instructions' => $recipe->getInstructions(),
            'difficulty' => $recipe->getDifficulty(),
            'ingredients' => $recipe->getIngredients(),
        ];
        return $this->json($data);
    }

    #[Route('/recipes/edit/{id}', name: "edit_a_recipe", methods: ['PUT', 'PATCH'])]
    public function editRecipe(Request $request, int $id, ManagerRegistry $doctrine)
    {
        $entityManager = $doctrine->getManager();
        $recipe = $entityManager->getRepository(Recipe::class)->find($id);

        if (!$recipe) {
            return $this->json('No recipe was found with the id of ' . $id, 404);
        }

        $recipe->setName($request->request->get('name'));
        $entityManager->flush();

        $data =  [
            'id' => $recipe->getId(),
            'name' => $recipe->getName(),
        ];

        return $this->json($data);
    }
    #[Route('/recipes/remove/{id}', name: "remove_a_recipe", methods: ['DELETE'])]
    public function removeRecipe($id, ManagerRegistry $doctrine)
    {
        $recipe = $doctrine->getRepository(Recipe::class)->find($id);
        $entityManager = $doctrine->getManager();

        if (!$recipe) {
            throw $this->createNotFoundException(
                'No recipe was found with the id of ' . $id
            );
        } else {
            $entityManager->remove($recipe);
            $entityManager->flush();
            return $this->json([
                'message' => 'Removed the recipe with the id of ' . $id
            ]);
        }
    }
}