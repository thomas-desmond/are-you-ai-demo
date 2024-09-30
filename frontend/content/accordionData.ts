import { fullstackAppMarkdown } from './fullstackAppMarkdown';
import { onPageLoadMarkdown } from './onPageLoadMarkdown';
import { onUserSubmissionMarkdown } from './onUserSubmissionMarkdown';



export const accordionData = [
    {
      title: "Full-Stack Application Powered by Cloudflare",
      description: fullstackAppMarkdown,
      imageSrc: "/are-you-ai-services.png",
      width: 1200,
      height: 783,
      learnMoreUrl: "https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/",
    },
    {
      title: "On Page Load Data Flow",
      description: onPageLoadMarkdown,
      imageSrc: "/on-page-load-diagram.png",
      width: 2400,
      height: 1500,
    },
    {
      title: "On User Image Description Submission",
      description: onUserSubmissionMarkdown,
      imageSrc: "/on-user-submission-diagram.png",
      width: 2050,
      height: 1246,
    },
    {
      title: "Global Serverless API",
      description:
        "Serverless globally-deployed APIs offer a cost-effective,scalable, and agile approach to building modern applications and services, allowing organizations to focus on delivering value to their users without being encumbered by the complexities of managing infrastructure.",
      imageSrc: "/region-earth.webp",
      width: 1999,
      height: 1126,
      learnMoreUrl:
        "https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-global-apis/",
    },
    {
      title: "Composable AI Architecture",
      description:
        "The AI market demands organizations to stay updated with the latest innovations. Composability, data portability, and standard APIs are crucial for mixing and matching AI components, facilitating seamless data exchange, ensuring interoperability, and fostering flexibility. Cloudflare's AI platform offers a composable AI infrastructure with support for standard interfaces and simplified development.",
      imageSrc: "/ai-composable.png",
      width: 1200,
      height: 639,
      learnMoreUrl:
        "https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-composable/",
    },
    {
      title: "AI Observability",
      description:
        "Using a forward proxy can mitigate challenges like fragmentation, availability, lack of observability, lack of cost control, and more. Cloudflare AI Gateway is positioned between the service making inference requests and the inference service platform, it serves as a single point for observability and control. By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.",
      imageSrc: "/ai-observability.png",
      width: 1200,
      height: 380,
      learnMoreUrl:
        "https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-multivendor-observability-control/",
    },
  ];
  