<?php

namespace App\Controller;

use App\Factory\CityLocatorFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api')]
class GeoCodeController extends AbstractController
{
    public function __construct(
        private CityLocatorFactory $cityLocatorFactory,
    ) {
    }

    #[Route('/geocode', name: 'app_geocode', methods: ['POST'])]
    public function geocode(Request $request): JsonResponse
    {
        // Récupérer les données de la requête
        $data = json_decode($request->getContent(), true);
        if (!is_array($data)) {
            return $this->json(['error' => 'Invalid JSON'], 400);
        }
        $city = $data['town'] ?? null; // Le nom de la ville
        $country = $data['country'] ?? null; // Le pays du client

        // Vérifier que la ville et le pays sont fournis
        if (!$city || !$country) {
            return $this->json(['error' => 'City or country is missing'], 400);
        }

        // Récupérer les coordonnées à partir du fichier JSON
        $cityLocatorService = $this->cityLocatorFactory->create();
        $coordinates = $cityLocatorService->getCoordinates($city, $country);

        // Si aucune coordonnée n'est trouvée, retourner une erreur
        if (!$coordinates) {
            return $this->json(['error' => 'City not found', 'city' => $city, 'country' => $country], 404);
        }

        // Retourner les coordonnées de la ville et du pays sous forme de réponse JSON
        return $this->json([
            'lat' => $coordinates['lat'],
            'lng' => $coordinates['lng'],
            'city' => $coordinates['city'],
            'country' => $coordinates['country'],
        ]);
    }
}
