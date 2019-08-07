move_package_core:
	rsync -a --include '*' ./src/components/core/lib/src/components/core/ ./publish;\
	cp ./src/components/core/package.json ./publish/;\
	cp ./README.md ./publish/;\

fms_publish:
	npm run build:components;\
	npm run patch;\
	make move_package_core;\
	git add .; \
	git commit --no-verify -m 'Automatic commit of successful build $(BUILDID)'; \
	git push; \
	npm run publish; \
