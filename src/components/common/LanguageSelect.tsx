import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", flag: "https://flagcdn.com/us.svg" },
    { code: "sw", name: "Swahili", flag: "https://flagcdn.com/tz.svg" },
    { code: "yo", name: "Yorùbá", flag: "https://flagcdn.com/ng.svg" },
    { code: "ha", name: "Hausa", flag: "https://flagcdn.com/ng.svg" },
    { code: "ig", name: "Igbo", flag: "https://flagcdn.com/ng.svg" },
    { code: "es", name: "Español", flag: "https://flagcdn.com/es.svg" },
    { code: "fr", name: "Français", flag: "https://flagcdn.com/fr.svg" },
  ];

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const switchLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("i18nextLng", langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[150px] justify-between flex items-center border border-black/40 py-1.5 px-3 mr-5">
          <div className="flex items-center gap-2 text-black">
            <img
              src={currentLanguage.flag}
              width={20}
              height={15}
              alt={currentLanguage.name}
              className="h-4 w-6 object-cover"
            />
            <span className="ml-2 text-sm text-black">
              {currentLanguage.name}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img
                src={lang.flag}
                width={20}
                height={15}
                alt={lang.name}
                className="h-4 w-6 object-cover"
              />
              <span>{lang.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelect;
