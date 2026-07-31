async function retry(fn, retries = 3, delay = 500) {

    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {

            return await fn();

        }

        catch (err) {

            lastError = err;

            await new Promise(resolve =>
                setTimeout(resolve, delay * attempt)
            );

        }

    }

    throw lastError;

}

module.exports = retry;