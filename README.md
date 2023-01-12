
## Ecommerce desarrollado como solución al desafío del proceso de reclutamiento de Adamspay https://adamspay.com

La temática del desafio era crear una solución para que Papá Noel pueda recibir las listas de regalos, ya que debido a la pandemia no podría mandar buscarlas. La solución debía incluir el ciclo de cobro utilizando la solución de cobro de Adamspay.

El proyecto lo desarrollé en #nextjs, el cual ya integra los modulos de frontend y backend, y agiliza bastante el proceso de desarrollo.

La persistencia de datos lo implementé con la plataforma #sanity (https://www.sanity.io/)

El deploy lo hice en la plataforma de #Vercel.

El ciclo de cobro se cierra mediante los emails transaccionales enviados al comprador desde un webhook que recibe el estado de la deuda desde Adamspay. Para el envío de emails utilicé la plataforma smtp #sendgrid https://sendgrid.com/

El sitio se puede acceder en la siguiente url: https://ayudantedesanta.vercel.app/
