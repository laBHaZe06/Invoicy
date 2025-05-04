<?php

namespace App\Factory;

use App\Service\CityLocatorService;
use Symfony\Component\HttpKernel\KernelInterface;

class CityLocatorFactory
{
    public function __construct(private KernelInterface $kernel)
    {
    }

    public function create(): CityLocatorService
    {
        $citiesFile = $this->kernel->getProjectDir().'/src/Data/cities.json';

        return new CityLocatorService($citiesFile);
    }
}
