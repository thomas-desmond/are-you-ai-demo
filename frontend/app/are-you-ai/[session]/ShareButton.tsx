import * as React from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  XIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";

interface ShareButtonProps {
  similarity: number;
}

export default function ShareButton({ similarity }: ShareButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const shareUrl = "https://areyouaidemo.com/";
  const shareTitle = "Are You AI? - A Cloudflare Developer Platform Demo";
  const expandedTitle = `Using Cloudflare Workers AI I found out I'm ${similarity}% AI? See how you compare! \n\n${shareTitle} #Cloudflare #AreYouAICloudflare`;
  const summary = `Using Cloudflare Workers AI I found out I'm ${similarity}% AI? See how you compare to AI! #Cloudflare #AreYouAICloudflare`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px]">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="grid gap-2">
          <TwitterShareButton
            className="w-full justify-start"
            url={shareUrl}
            title={expandedTitle}
          >
            <div className="flex flex-row items-center space-x-2 ml-2">
              <XIcon className="h-4 w-4" />
              <p>X</p>
            </div>
          </TwitterShareButton>
          <FacebookShareButton className="w-full justify-start" url={shareUrl}>
            <div className="flex flex-row items-center space-x-2 ml-2">
              <FacebookIcon className="h-4 w-4" />
              <p>Facebook</p>
            </div>
          </FacebookShareButton>
          <WhatsappShareButton
            className="w-full justify-start"
            url={shareUrl}
            title={expandedTitle}
          >
            <div className="flex flex-row items-center space-x-2 ml-2">
              <WhatsappIcon className="h-4 w-4" />
              <p>Whatsapp</p>
            </div>
          </WhatsappShareButton>
          <TelegramShareButton
            className="w-full justify-start"
            title={expandedTitle}
            url={shareUrl}
          >
            <div className="flex flex-row items-center space-x-2 ml-2">
              <TelegramIcon className="h-4 w-4" />
              <p>Telegram</p>
            </div>
          </TelegramShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
