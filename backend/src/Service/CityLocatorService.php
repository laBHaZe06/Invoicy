<?php

namespace App\Service;

class CityLocatorService
{
    private array $data;

    public function __construct(string $projectDir)
    {
        $jsonPath = $projectDir.'/src/Data/cities.json';
        if (!file_exists($jsonPath)) {
            throw new \RuntimeException("cities.json not found at $jsonPath");
        }

        $json = file_get_contents($jsonPath);
        $this->data = json_decode($json, true);

        if (null === $this->data) {
            throw new \RuntimeException('Failed to decode JSON from cities.json');
        }
    }

    public function getCoordinates(string $city, string $country): ?array
    {
        foreach ($this->data as $countryData) {
            // Match country by name or translations
            $countryNames = array_filter([
                $countryData['name'] ?? null,
                $countryData['translations']['fr'] ?? null,
                $countryData['translations']['en'] ?? null,
            ]);

            if (!in_array($country, $countryNames, true)) {
                continue;
            }

            foreach ($countryData['states'] as $state) {
                foreach ($state['cities'] as $cityData) {
                    if (0 === strcasecmp($cityData['name'], $city)) {
                        return [
                            'lat' => $cityData['latitude'],
                            'lng' => $cityData['longitude'],
                            'city' => $cityData['name'],
                            'state' => $state['name'],
                            'country' => $countryData['name'],
                        ];
                    }
                }
            }
        }

        return null;
    }
}
