./build.sh
cd _site
aws --profile milkprojects s3 sync . s3://michael.standen.link --storage-class REDUCED_REDUNDANCY --delete
