import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export const SearchTrigger = ({ onClick, className }: SearchTriggerProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={className}
      aria-label="Pesquisar produtos"
    >
      <Search className="w-5 h-5" />
    </Button>
  );
};

export const SearchBar = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex items-center gap-3 px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-xl transition-colors text-sm text-muted-foreground"
    >
      <Search className="w-4 h-4" />
      <span>Pesquisar produtos...</span>
    </button>
  );
};
