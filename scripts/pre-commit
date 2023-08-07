#!/bin/sh

echo "=================================="
echo "   Performing pre-commit checks   "
echo "=================================="

git stash -q --keep-index

echo "=================================="
echo "         Formating files...       "
echo "=================================="
yarn format

echo "=================================="
echo "         Linting files...         "
echo "=================================="
yarn lint

echo "=================================="
echo "         Checking types...        "
echo "=================================="
yarn typecheck

echo "=================================="
echo "         Testing files...         "
echo "=================================="
yarn test

status=$?

git stash pop -q

exit $status