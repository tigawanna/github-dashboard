import { createFileRoute} from "@tanstack/react-router";
import { viewerBeforeLoad } from "@/lib/viewer/before-load";
import { HomePage } from "./-components/HomePage";


export const Route = createFileRoute("/")({
  component: HomePage,
  beforeLoad: async (ctx) => {
    return viewerBeforeLoad(ctx);
  },
});


