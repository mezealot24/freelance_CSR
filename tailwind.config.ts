import animatePlugin from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ไฟล์ที่ต้องการใช้ Tailwind CSS
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '15px'
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '960px',
  		xl: '1200px'
  	},
  	fontFamily: {
  		primary: 'var(--font-jetbrainsMono)'
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#CCE4FF',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				dark: '#5B9EFF',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				hover: '#FF995C',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			warning: {
  				soft: '#FFE4CC',
  				DEFAULT: '#FF9F5C',
  				strong: '#FF8534'
  			},
  			success: {
  				soft: '#E3F3E6',
  				DEFAULT: '#4CAF50',
  				strong: '#388E3C'
  			},
  			neutral: {
  				'100': '#F8FAFC',
  				'200': '#E2E8F0',
  				'300': '#CBD5E1',
  				'400': '#94A3B8',
  				'500': '#64748B'
  			},
  			boxshadow: {
  				game: '4px 4px 0 0 #422800',
  				'game-press': '2px 2px 0 0 #422800'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	keyframes: {
  		'accordion-down': {
  			from: {
  				height: '0'
  			},
  			to: {
  				height: 'var(--radix-accordion-content-height)'
  			}
  		},
  		'accordion-up': {
  			from: {
  				height: 'var(--radix-accordion-content-height)'
  			},
  			to: {
  				height: '0'
  			}
  		}
  	},
  	animation: {
  		'accordion-down': 'accordion-down 0.2s ease-out',
  		'accordion-up': 'accordion-up 0.2s ease-out'
  	}
  },
    plugins: [animatePlugin, require("tailwindcss-animate")], // ใช้ตัวแปร animatePlugin ที่ import มา
  };


