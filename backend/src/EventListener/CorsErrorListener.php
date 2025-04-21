<?php
namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class CorsErrorListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        $request = $event->getRequest();
        $origin = $request->headers->get('Origin');

        // On ne modifie que les requêtes cross-origin
        if (!$origin) {
            return;
        }

        $response = new Response();
        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->setStatusCode(400);

        $exception = $event->getThrowable();
        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->setContent(json_encode([
                'error' => $exception->getMessage()
            ]));
        } else {
            $response->setContent(json_encode([
                'error' => 'Internal Server Error',
            ]));
        }

        $event->setResponse($response);
    }
}
