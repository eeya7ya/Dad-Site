import { LanguageProvider } from "@/lib/i18n";
import { Site } from "@/components/Site";

export default function Home() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}
