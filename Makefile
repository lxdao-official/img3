release:
	npm whoami
	npx lerna run build
	#npx lerna exec 'npm publish --dry-run'
	npx lerna version --force-publish --conventional-commits --yes
	npx lerna exec 'npm publish --access public'
