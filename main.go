package main

import (
	"os"

	"github.com/Djancyp/luna"
	"github.com/Djancyp/luna/pkg"
)

func main() {

	app, err := luna.New(luna.Config{
		ENV:                 "dev", // dev, prodoction
		RootPath:            "frontend/",
		AssetsPath:          "frontend/src/assets",
		EntryPoint:         "frontend/src/entry-server.tsx",
		PublicPath:          "frontend/public",
		TailwindCSS:         true,
		HotReloadServerPort: 3000,
		Routes: []pkg.ReactRoute{
			{
				Path: "/",
				Props: func(_ ...map[string]string) map[string]interface{} {
					return map[string]interface{}{
						"title": "Hello World",
					}
				},
				Head: pkg.Head{
					Title:       "Home Page",
					Description: "home page description",
					CssLinks: []pkg.CssLink{
						{
							Href: "css/main.css",
						},
					},
				},
			},
			{
				Path: "/apipage",
				Head: pkg.Head{
					Title:       "API Page",
					Description: "API page description",
					CssLinks: []pkg.CssLink{
						{
							Href: "css/main.css",
						},
					},
				},
			},

			{
				Path:  "/propexample",
				Props: PropExample,
				Head: pkg.Head{
					Title:       "Prop Example",
					Description: "Prop page description",
					CssLinks: []pkg.CssLink{
						{
							Href: "css/main.css",
						},
					},
				},
			},
		},
	})
	if err != nil {
		app.Logger.Error().Msgf("Error: %s", err)
		panic(err)
	}

	err = app.InitializeFrontend()
	if err != nil {
		app.Logger.Error().Msgf("Error: %s", err)
		os.Exit(1)
	}
	app.Start(":8080")
}

type Product struct {
	Name  string
	Price float64
}

func PropExample(_ ...map[string]string) map[string]interface{} {

	return map[string]interface{}{
		"title": "Prop Example",
	}
}
