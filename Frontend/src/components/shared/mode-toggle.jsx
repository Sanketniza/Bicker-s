import { Moon, Sun, Circle } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTheme } from '../theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.style.backgroundColor = '#ffffff';
    } else if (newTheme === 'dark') {
      document.documentElement.style.backgroundColor = '#09090B';
    } else {
      document.documentElement.style.backgroundColor = '';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Button
          variant="outline"
          size="icon"
        //   className="border-2 border-[#10B981] "
        >
          {theme === 'light' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : theme === 'dark' ? (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Circle className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="right"
        className="mt-20 "
        style={{ borderColor: '#10B981' }}
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

