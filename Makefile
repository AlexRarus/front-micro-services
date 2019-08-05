move_package_core:
	rsync -a --include '*' ./src/components/lib/src/components/ ./publish;\
	cp ./src/components/package.json ./publish/;\

publish:
	npm run build:components;\
	npm run patch;\
	make move_package_core;\
	git add .; \
	git commit --no-verify -m 'Automatic commit of successful build $(BUILDID)'; \
	git push; \
	npm run publish; \
