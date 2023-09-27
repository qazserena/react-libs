#!/bin/bash

VERSION=$1

if [ -z "$VERSION" ]; then
	echo '需要指定版本号'
	exit
fi

nrm use brilljoy-host

npm run build

npm version $VERSION

npm publis --access=public

nrm use brilljoy

