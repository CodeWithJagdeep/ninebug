import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ["VITE_"]);
  const isProduction = mode === "production";
  const isDevelopment = mode === "development";

  return {
    plugins: [
      react(),
      tailwindcss(),
      createHtmlPlugin({
        minify: isProduction,
        inject: {
          data: {
            title: env.VITE_APP_NAME || "My App",
            csp: env.VITE_CSP_DIRECTIVES || "default-src 'self'",
            gaId: env.VITE_GOOGLE_ANALYTICS_ID || "",
          },
        },
      }),
      ...(isProduction
        ? [
            visualizer({
              filename: "./dist/bundle-analysis.html",
              gzipSize: true,
              brotliSize: true,
              open: true,
            }),
            VitePWA({
              registerType: "autoUpdate",
              includeAssets: [
                "favicon.ico",
                "robots.txt",
                "apple-touch-icon.png",
              ],
              manifest: {
                name: env.VITE_APP_NAME,
                short_name: env.VITE_APP_NAME,
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#000000",
                icons: [
                  {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any",
                  },
                  {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                  },
                ],
              },
              workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                    handler: "StaleWhileRevalidate",
                    options: {
                      cacheName: "google-fonts-stylesheets",
                    },
                  },
                  {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                    handler: "CacheFirst",
                    options: {
                      cacheName: "google-fonts-webfonts",
                      expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                      },
                    },
                  },
                ],
              },
            }),
          ]
        : []),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },

    server: {
      host: true,
      port: 5173,
      allowedHosts: [
        "fe1b-2409-40e6-13d-3bf0-d10b-2d93-43bc-b8e4.ngrok-free.app",
      ],
      open: !isProduction,
      strictPort: true,
      hmr: {
        overlay: false,
      },
    },

    preview: {
      port: 4173,
      strictPort: true,
      headers: {
        "Content-Security-Policy":
          env.VITE_CSP_DIRECTIVES || "default-src 'self'",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Strict-Transport-Security":
          "max-age=63072000; includeSubDomains; preload",
      },
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: isProduction ? "hidden" : true,
      minify: isProduction ? "terser" : false,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.info", "console.debug"],
              passes: 3,
            },
            format: {
              comments: false,
            },
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
          }
        : undefined,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "vendor-react";
              if (id.includes("firebase")) return "vendor-firebase";
              if (id.includes("lodash")) return "vendor-lodash";
              if (id.includes("@sentry")) return "vendor-sentry";
              return "vendor";
            }
          },
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]",
          generatedCode: {
            reservedNamesAsProps: false,
          },
        },
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          warn(warning);
        },
      },
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: false,
      modulePreload: {
        polyfill: false,
      },
      cssCodeSplit: true,
      target: "esnext",
    },

    optimizeDeps: {
      exclude: ["js-big-decimal"],
      esbuildOptions: {
        target: "esnext",
      },
    },
  };
});
