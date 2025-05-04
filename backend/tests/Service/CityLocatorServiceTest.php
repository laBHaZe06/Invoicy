<?php

namespace App\Tests\Service;

use App\Service\CityLocatorService;
use PHPUnit\Framework\TestCase;

class CityLocatorServiceTest extends TestCase
{
    private CityLocatorService $service;

    protected function setUp(): void
    {
        $projectDir = __DIR__.'/../../'; // Point vers le dossier racine du projet
        $this->service = new CityLocatorService($projectDir);
    }

    public function testGetCoordinatesReturnsCorrectData(): void
    {
        $coords = $this->service->getCoordinates('Paris', 'France');

        $this->assertNotNull($coords);
        $this->assertEquals(48.8566, $coords['lat']);
        $this->assertEquals(2.3522, $coords['lng']);
        $this->assertEquals('Paris', $coords['city']);
        $this->assertEquals('Default', $coords['state']);
        $this->assertEquals('France', $coords['country']);
    }

    public function testGetCoordinatesWithDifferentCase(): void
    {
        $coords = $this->service->getCoordinates('paris', 'france');

        $this->assertNotNull($coords);
        $this->assertEquals(48.8566, $coords['lat']);
    }

    public function testGetCoordinatesWithTranslatedCountry(): void
    {
        $coords = $this->service->getCoordinates('Zurich', 'Suisse'); // Match via 'translations.fr'

        $this->assertNotNull($coords);
        $this->assertEquals(47.3769, $coords['lat']);
    }

    public function testGetCoordinatesWithInvalidCity(): void
    {
        $coords = $this->service->getCoordinates('NonExistentCity', 'France');

        $this->assertNull($coords);
    }

    public function testGetCoordinatesWithInvalidCountry(): void
    {
        $coords = $this->service->getCoordinates('Paris', 'Atlantis');

        $this->assertNull($coords);
    }
}
